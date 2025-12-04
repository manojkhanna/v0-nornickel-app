import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amaklogo-hiMjLWPWzO0aqaGrdfoW2iHvGppUdw.png"
              alt="AMAK Mining"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>
          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">Account Created Successfully!</CardTitle>
              <CardDescription className="text-slate-600">Check your email to confirm your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 text-center">
                We&apos;ve sent a confirmation email to your inbox. Please verify your email address before signing in.
              </p>

              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">For Demo Purposes:</p>
                  <p>
                    If you don&apos;t receive the confirmation email, you can use the &quot;Try Demo Account&quot;
                    button on the sign-in page to explore the system immediately.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                  <Link href="/auth/login">Return to Sign In</Link>
                </Button>

                <Button asChild variant="outline" className="w-full border-slate-300 bg-transparent">
                  <Link href="/auth/login">Try Demo Account Instead</Link>
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center mb-2">Didn&apos;t receive the email?</p>
                <ul className="text-xs text-slate-500 space-y-1 pl-4">
                  <li>• Check your spam or junk folder</li>
                  <li>• Make sure you entered the correct email address</li>
                  <li>• Wait a few minutes and check again</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
