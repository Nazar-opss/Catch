"use client"
import { useState } from "react"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Image from "next/image"
import { Button } from "../ui/button"

export function DealsCarousel({ images, imageStyle }: { images: string[], imageStyle?: string }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

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
            <div className="w-full flex items-center justify-center p-8 relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm aspect-video sm:aspect-21/9 lg:aspect-16/10">
                <Carousel setApi={handleApiChange} className="w-full">
                    <CarouselContent className="aspect-video sm:aspect-21/9 lg:aspect-16/10">
                        {
                            images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <Image
                                        loading="eager"
                                        src={image}
                                        alt={image}
                                        width={400}
                                        height={400}
                                        className={imageStyle}
                                    />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className="w-10 h-10 z-10 left-0" />
                    <CarouselNext className="w-10 h-10 z-10 right-0" />
                </Carousel>
            </div>
            <div className="flex justify-center gap-2">
                {
                    images.map((image, index) => (
                        <Button className={`rounded-xl overflow-hidden bg-white p-0 hover:bg-white aspect-square w-20 h-20 border-2 transition-all shadow-sm duration-200 hover:scale-105 cursor-pointer ${current === index ? "border-orange-600" : "border-transparent hover:border-orange-600"}`}
                            key={index} variant="secondary"
                            onClick={() => api?.scrollTo(index)}>
                            <Image
                                loading="eager"
                                src={image}
                                alt={image}
                                width={64}
                                height={64}
                                className="object-contain rounded-xl p-1 w-full h-full"
                            />
                        </Button>
                    ))
                }

            </div>
        </div>
    )
}