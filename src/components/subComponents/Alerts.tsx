import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CircleCheck } from "lucide-react"

export const AlertBad = ({ message }: { message: string }) => {
  return (
    <Alert className="bg-sunsetOrange-500/20">
      <AlertCircle className="h-4 w-4 fill-sunsetOrange-400" />
      <AlertTitle className="text-sunsetOrange-500">Error</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}

export const AlertOk = ({ message }: { message: string }) => {
  return (
    <Alert className="bg-forest-500/20">
      <CircleCheck className="h-4 w-4 text-forest-500 fill-forest-200" />
      <AlertTitle className="text-forest-600">Éxito</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}


