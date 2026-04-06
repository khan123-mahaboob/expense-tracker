import * as React from "react";
import { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if ((this as any).state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      try {
        const parsedError = JSON.parse((this as any).state.error?.message || "");
        if (parsedError.error) {
          errorMessage = `Firebase Error: ${parsedError.error} (Operation: ${parsedError.operationType})`;
        }
      } catch (e) {
        errorMessage = (this as any).state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
          <Card className="max-w-md w-full bg-black/40 backdrop-blur-xl border-rose-500/20 text-white shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                <AlertCircle className="h-6 w-6 text-rose-500" />
              </div>
              <CardTitle className="text-xl font-bold tracking-tight">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white/60 text-center text-sm leading-relaxed">
                {errorMessage}
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center justify-center"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reload Application
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
