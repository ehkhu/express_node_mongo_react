import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        <h1 className="text-xl"> 
          The page you are looking for could not be found 😢
        </h1>
        <Button onClick={moveBack}>
          &larr; Go back
        </Button>
      </div>
      </div>
  );
}

export default PageNotFound;
