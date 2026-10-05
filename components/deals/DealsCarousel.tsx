"use client"
import { useState } from "react"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Image from "next/image"
import { Button } from "../ui/button"
import NoImage from "../ui/noImage"

export function DealsCarousel({ images, imageStyle }: { images: string[], imageStyle?: string }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
    const availableImages = images.filter((image) => !failedImages.has(image));
    const activeIndex = availableImages.length
        ? Math.min(current, availableImages.length - 1)
        : 0;

    const markImageAsFailed = (image: string) => {
        setFailedImages((current) => new Set(current).add(image));
    };

    const handleApiChange = (newApi: CarouselApi) => {
        setApi(newApi)
        if (newApi) {
            setCurrent(newApi.selectedScrollSnap())
            newApi.on("select", () => {
                setCurrent(newApi.selectedScrollSnap())
            })
        }
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-center p-8 relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm aspect-video sm:aspect-21/9 lg:aspect-16/10">
                <Carousel setApi={handleApiChange} className="w-full">
                    <CarouselContent className="aspect-video sm:aspect-21/9 lg:aspect-16/10">
                        {
                            availableImages.map((image) => (
                                <CarouselItem key={image}>
                                    <Image
                                        loading="eager"
                                        src={image}
                                        alt={image}
                                        width={400}
                                        height={400}
                                        unoptimized
                                        className={imageStyle}
                                        onError={() => markImageAsFailed(image)}
                                    />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    {availableImages.length > 1 && <CarouselPrevious className="w-10 bg-background/70 backdrop-blur-sm border-border text-foreground shadow-sm
                    hover:bg-background hover:scale-105 transition-all duration-200 h-10 z-10 left-3" variant={"default"} />
                    }
                    {availableImages.length > 1 && <CarouselNext className="w-10 bg-background/70 backdrop-blur-sm border-border text-foreground shadow-sm hover:bg-background hover:scale-105 transition-all duration-200 h-10 z-10 right-3" variant={"default"}/>
                    }
                </Carousel>
                {availableImages.length === 0 && <NoImage dealPage />}
            </div>
            <div className="flex justify-center flex-wrap gap-2">
                {
                    availableImages.map((image, index) => (
                        <Button className={`rounded-xl overflow-hidden bg-card p-0  hover:bg-card aspect-square w-20 h-20 border-2 transition-all shadow-sm duration-200 hover:scale-105 cursor-pointer ${activeIndex === index ? "border-primary" : "border-transparent hover:border-primary"}`}
                            key={index} variant="secondary"
                            onClick={() => api?.scrollTo(index)}>
                            <Image
                                loading="eager"
                                src={image}
                                alt={image}
                                width={64}
                                height={64}
                                unoptimized
                                className="object-contain rounded-xl p-1 w-full h-full"
                                onError={() => markImageAsFailed(image)}
                            />
                        </Button>
                    ))
                }

            </div>
        </div>
    )
}
