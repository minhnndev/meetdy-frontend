import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function LoadingScreen({ progress }: { progress: number }) {
    return (
        <div className="flex h-screen items-center justify-center custom-bg">
            <Card className="w-[300px] bg-transparent border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-6">
                    <Progress value={progress} className="w-full h-2 bg-muted" />
                </CardContent>
            </Card>
        </div>
    );
}
