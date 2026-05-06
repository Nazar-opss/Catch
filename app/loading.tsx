import PageLoader from "@/components/ui/PageLoader";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white dark:bg-black">
            <PageLoader />
        </div>
    );
}