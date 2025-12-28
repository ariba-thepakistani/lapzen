"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Check, ShoppingBag, AlertCircle } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Payment Details
        </h3>
        <div className="max-h-[400px] overflow-y-auto">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-14 text-lg font-semibold"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Complete Purchase
          </span>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Your payment is secured with 256-bit SSL encryption
      </p>
    </form>
  );
}

function OrderSummary() {
  const { items, total } = useCart();

  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" />
        Order Summary
      </h3>

      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-navy text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy truncate">{item.name}</p>
              <p className="text-sm text-muted-foreground">${item.price.toLocaleString()}</p>
            </div>
            <p className="text-sm font-semibold text-navy">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-navy pt-3 border-t border-border">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function SuccessState({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-navy mb-4">Payment Successful!</h2>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been confirmed and you will receive an email confirmation shortly.
        </p>
        <Button onClick={onContinue} className="h-12 px-8">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setIsLoading(false);
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total * 100,
            items: items,
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to create payment");
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [items, total]);

  const handleSuccess = () => {
    setIsSuccess(true);
    clearCart();
  };

  const handleContinue = () => {
    window.location.href = "/";
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-border bg-white sticky top-0 z-50">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/svgs/347e75bb-ec5b-455b-be95-96a1d46d0742_096381d0-0717-1.svg"
                alt="Lapzen"
                width={100}
                height={36}
                className="h-auto w-[100px] brightness-0"
              />
            </Link>
          </div>
        </header>
        <main className="container py-12">
          <SuccessState onContinue={handleContinue} />
        </main>
      </div>
    );
  }

  if (items.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-border bg-white sticky top-0 z-50">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/svgs/347e75bb-ec5b-455b-be95-96a1d46d0742_096381d0-0717-1.svg"
                alt="Lapzen"
                width={100}
                height={36}
                className="h-auto w-[100px] brightness-0"
              />
            </Link>
          </div>
        </header>
        <main className="container py-12">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-navy mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some items to proceed to checkout</p>
              <Link href="/">
                <Button className="h-12 px-8">Browse Products</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/svgs/347e75bb-ec5b-455b-be95-96a1d46d0742_096381d0-0717-1.svg"
              alt="Lapzen"
              width={100}
              height={36}
              className="h-auto w-[100px] brightness-0"
            />
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="container py-8 lg:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>

        <h1 className="text-3xl font-bold text-navy mb-8">Checkout</h1>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading checkout...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold text-navy mb-2">Something went wrong</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        ) : clientSecret ? (
          <div className="grid lg:grid-cols-[1fr,400px] gap-8 lg:gap-12">
            <div>
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#0a1628",
                      colorBackground: "#ffffff",
                      colorText: "#0a1628",
                      colorDanger: "#dc2626",
                      fontFamily: "DM Sans, system-ui, sans-serif",
                      borderRadius: "12px",
                      spacingUnit: "4px",
                    },
                    rules: {
                      ".Input": {
                        border: "1px solid #e2e8f0",
                        boxShadow: "none",
                        padding: "12px 16px",
                      },
                      ".Input:focus": {
                        border: "1px solid #0a1628",
                        boxShadow: "0 0 0 1px #0a1628",
                      },
                      ".Label": {
                        fontWeight: "500",
                        marginBottom: "8px",
                      },
                      ".Tab": {
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      },
                      ".Tab--selected": {
                        border: "2px solid #0a1628",
                        backgroundColor: "#f8fafc",
                      },
                    },
                  },
                }}
              >
                <CheckoutForm onSuccess={handleSuccess} />
              </Elements>
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
