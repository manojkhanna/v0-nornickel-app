import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error || "An authentication error occurred"

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
          <Card className="border-red-200 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-16 w-16 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">Authentication Error</CardTitle>
              <CardDescription className="text-slate-600">There was a problem with your authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">{error}</div>

              <div className="space-y-2">
                <p className="text-sm text-slate-600">This could be due to:</p>
                <ul className="text-sm text-slate-600 space-y-1 pl-4">
                  <li>• Email confirmation required but not completed</li>
                  <li>• Invalid or expired authentication link</li>
                  <li>• Network connectivity issues</li>
                  <li>• Incorrect login credentials</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                  <Link href="/auth/login">Try Signing In Again</Link>
                </Button>

                <Button asChild variant="outline" className="w-full border-slate-300 bg-transparent">
                  <Link href="/auth/signup">Create New Account</Link>
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center mb-2">
                  For demo purposes, you can use the &quot;Try Demo Account&quot; button on the login page to access the
                  system immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
