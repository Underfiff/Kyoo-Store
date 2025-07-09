"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function ContactPage() {
  const phoneNumber = "6288286353470"; 
  const message = encodeURIComponent("Halo, saya ingin menghubungi Anda.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-20">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-xl">Hubungi Kami</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Silakan hubungi kami melalui WhatsApp untuk pertanyaan atau
              konsultasi.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full" variant="default">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat via WhatsApp
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.7s ease-out both;
        }
      `}</style>
      <footer className="py-6 text-center text-sm text-gray-500 w-full ">
        © {new Date().getFullYear()} KyooPremium. All Rights Reserved.
      </footer>
    </>
  );
}
