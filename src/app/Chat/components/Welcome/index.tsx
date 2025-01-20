import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { memo, useRef } from "react";
import { useTranslation } from "react-i18next";

const Welcome = () => {
    const { t } = useTranslation();
    const plugin = useRef(Autoplay({ delay: 3000 }));

    return (
        <div className="text-center h-screen">
            <div>
                <div className="mt-20 text-lg font-medium">{t("common.welcome")}</div>
                <div className="m-6">{t("common.intro")}</div>
            </div>

            <div className="flex items-center justify-center h-[50vh] w-full">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        <CarouselItem>
                            <div className="p-1">
                                <div className="text-base">Meetdy Beta-1</div>
                                <span className="text-sm">
                                    Open beta - Release Candidate (rc-1)
                                </span>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="p-1">
                                <div className="text-base">Alpha Release</div>
                                <span className="text-sm">
                                    Start Demo - Release Candidate (rc-1.0.0)
                                </span>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default memo(Welcome);
