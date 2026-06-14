import Link from "next/link";
import { Button } from "@esmate/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@esmate/shadcn/components/ui/card";
import { AlertCircle, Home } from "@esmate/shadcn/pkgs/lucide-react";

export default function NotFound() {
  return (
    <Card className="w-full py-20">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="text-lg">Not Found</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mb-5 text-center">
        <p className="text-muted-foreground">
          Could not find the requested resource. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
