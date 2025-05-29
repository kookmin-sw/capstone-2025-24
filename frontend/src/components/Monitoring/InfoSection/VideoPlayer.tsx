import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import * as S from './InfoSection.style';
import { CctvInfo } from '@/types/cctv';
import { useSelectedCctvStore } from '@/stores/selectedCctvStore';

interface VideoPlayerProps {
  locations: CctvInfo[];
}

const VideoPlayer = ({ locations }: VideoPlayerProps) => {
  const { selectedIndex } = useSelectedCctvStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const target = locations.find((loc) => loc.id === selectedIndex);
    if (!target || !videoRef.current) return;

    const video = videoRef.current;
    const hls = new Hls();

    if (selectedIndex === 1) {
      if (Hls.isSupported()) {
        hls.loadSource(target.liveUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = target.liveUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    } else if (selectedIndex == 2) {
      const localVideoPath =
        'https://nurinoon-bucket.s3.ap-northeast-2.amazonaws.com/front/cctv2_2-2.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkYwRAIgQbA94XHubyR4r69%2FHZCIZQu%2FCexJHAWKyCMeV%2BqpErUCICBVzHePmX2NCoLUG0GYTtCVciJ%2FOJO4rx90SGVa0VOqKsIDCJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTA3MjgzOTk1MjM3IgwVhY6zI78C%2FRnCR2cqlgNOl6McPyOii1i1sAmZ6fweLAs5DXKyz6cwapQRVARyYA3%2B7Okm4YNgc%2FtlAze7LGw0DA%2FmIfNFUVC5u2A0zC4lBHs1gwCZ3oAJpngL5ZYwnTHSZN9azmHVIXfZEmbLNGww0KEbpd3vOf0vSJljq8V5zsJ3%2FPDD2TaA%2B7SEpj68v3%2FYqhnBxvK4gSi%2Felb7cOm9WkyEOxD6b%2BOXMzn9ENbUfUZ6bTlfNuIzfmXSgkR%2FJGWBxmyEkEvKSN%2B7kMN35hSdxjqC3EOEc5c3sZk%2BOviFmd1buqAxZnDbwTm%2FniHJQ5VSDsQIu9ObA6XfEkrsRP2rCagC7RBxMYh6Gx%2FGopHRhdHCHeVGB23EucXenlYUCy%2BAVGAQfBH%2FA3uihSH3mh%2B%2F6tESJIncDx%2BBzfZJ27VKKVCvP9mUz%2BPre3Ac3R3hB5WNzSrsN%2BgVIwRTyKvI%2BVnao2iAS8gw453LtccHlxBPIEqCl%2BTXCBbYSP9p4BOIQGvMLQMEEaMFRH4TW32OO9Cr6YdYY4ZsH18kcqw%2B9aGsOhoCSU%2BhMITQ48EGOt8CoV9c%2B9Q6UJ%2BNRxPuKUen0p1LgQwwA5go7lFicdEHenCsTWAZSpvN%2Bz7u7uOK49gl5CbTD4H6imMbkLBKHAocSsPW3BoFMklW%2F5NX6tsydYMG0juyJdAqECk0LWf3UFtVqYi6WmbKIrF1%2F6cjXp1gxyc5hVfMGqOoXEwwUxW6%2BA3xtwSXqTZ1Ezi5JUclWEN6cebgMgFvPue4xEP58UrBoo1ogfVOCTc4BgrWdF3G3cUNYoKorP%2F3RTdqje3lgh7XIhJ%2BDGN8x3L9ox4GfvW7kDR%2FfcjkxHiVjqlcopcYChjUQvb%2FF3nb6JAOVymd1y1RJnvZ34%2FdtTqESkBns6VpkGl3pPH9XXjyzc6YpJ7%2BIjVlEMrIA1gMrNXZC3sVQkCbPzLV2RHuaQZBa7yiEJlspm053pN8%2FLMNlDmRTLIZnNmcimG%2BlAkXqBZG%2BMdJCKfoERLTIKdkCzP1U5L3wm7J&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5GPSXDJSQQGIB7BV%2F20250529%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250529T230609Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=ede5290e11ed0b256300483ae6036f2d48d83d58447ca0f7bc6dfe01ba306b13';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 3) {
      const localVideoPath =
        'https://nurinoon-bucket.s3.ap-northeast-2.amazonaws.com/front/cctv_3.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkYwRAIgQbA94XHubyR4r69%2FHZCIZQu%2FCexJHAWKyCMeV%2BqpErUCICBVzHePmX2NCoLUG0GYTtCVciJ%2FOJO4rx90SGVa0VOqKsIDCJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTA3MjgzOTk1MjM3IgwVhY6zI78C%2FRnCR2cqlgNOl6McPyOii1i1sAmZ6fweLAs5DXKyz6cwapQRVARyYA3%2B7Okm4YNgc%2FtlAze7LGw0DA%2FmIfNFUVC5u2A0zC4lBHs1gwCZ3oAJpngL5ZYwnTHSZN9azmHVIXfZEmbLNGww0KEbpd3vOf0vSJljq8V5zsJ3%2FPDD2TaA%2B7SEpj68v3%2FYqhnBxvK4gSi%2Felb7cOm9WkyEOxD6b%2BOXMzn9ENbUfUZ6bTlfNuIzfmXSgkR%2FJGWBxmyEkEvKSN%2B7kMN35hSdxjqC3EOEc5c3sZk%2BOviFmd1buqAxZnDbwTm%2FniHJQ5VSDsQIu9ObA6XfEkrsRP2rCagC7RBxMYh6Gx%2FGopHRhdHCHeVGB23EucXenlYUCy%2BAVGAQfBH%2FA3uihSH3mh%2B%2F6tESJIncDx%2BBzfZJ27VKKVCvP9mUz%2BPre3Ac3R3hB5WNzSrsN%2BgVIwRTyKvI%2BVnao2iAS8gw453LtccHlxBPIEqCl%2BTXCBbYSP9p4BOIQGvMLQMEEaMFRH4TW32OO9Cr6YdYY4ZsH18kcqw%2B9aGsOhoCSU%2BhMITQ48EGOt8CoV9c%2B9Q6UJ%2BNRxPuKUen0p1LgQwwA5go7lFicdEHenCsTWAZSpvN%2Bz7u7uOK49gl5CbTD4H6imMbkLBKHAocSsPW3BoFMklW%2F5NX6tsydYMG0juyJdAqECk0LWf3UFtVqYi6WmbKIrF1%2F6cjXp1gxyc5hVfMGqOoXEwwUxW6%2BA3xtwSXqTZ1Ezi5JUclWEN6cebgMgFvPue4xEP58UrBoo1ogfVOCTc4BgrWdF3G3cUNYoKorP%2F3RTdqje3lgh7XIhJ%2BDGN8x3L9ox4GfvW7kDR%2FfcjkxHiVjqlcopcYChjUQvb%2FF3nb6JAOVymd1y1RJnvZ34%2FdtTqESkBns6VpkGl3pPH9XXjyzc6YpJ7%2BIjVlEMrIA1gMrNXZC3sVQkCbPzLV2RHuaQZBa7yiEJlspm053pN8%2FLMNlDmRTLIZnNmcimG%2BlAkXqBZG%2BMdJCKfoERLTIKdkCzP1U5L3wm7J&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5GPSXDJSQQGIB7BV%2F20250529%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250529T230738Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=df76f8c43200c7ac04db0577935dded688802007097e1be2d2b166df6fdb8ccb';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 4) {
      const localVideoPath =
        'https://nurinoon-bucket.s3.ap-northeast-2.amazonaws.com/front/cctv_4.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkYwRAIgQbA94XHubyR4r69%2FHZCIZQu%2FCexJHAWKyCMeV%2BqpErUCICBVzHePmX2NCoLUG0GYTtCVciJ%2FOJO4rx90SGVa0VOqKsIDCJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTA3MjgzOTk1MjM3IgwVhY6zI78C%2FRnCR2cqlgNOl6McPyOii1i1sAmZ6fweLAs5DXKyz6cwapQRVARyYA3%2B7Okm4YNgc%2FtlAze7LGw0DA%2FmIfNFUVC5u2A0zC4lBHs1gwCZ3oAJpngL5ZYwnTHSZN9azmHVIXfZEmbLNGww0KEbpd3vOf0vSJljq8V5zsJ3%2FPDD2TaA%2B7SEpj68v3%2FYqhnBxvK4gSi%2Felb7cOm9WkyEOxD6b%2BOXMzn9ENbUfUZ6bTlfNuIzfmXSgkR%2FJGWBxmyEkEvKSN%2B7kMN35hSdxjqC3EOEc5c3sZk%2BOviFmd1buqAxZnDbwTm%2FniHJQ5VSDsQIu9ObA6XfEkrsRP2rCagC7RBxMYh6Gx%2FGopHRhdHCHeVGB23EucXenlYUCy%2BAVGAQfBH%2FA3uihSH3mh%2B%2F6tESJIncDx%2BBzfZJ27VKKVCvP9mUz%2BPre3Ac3R3hB5WNzSrsN%2BgVIwRTyKvI%2BVnao2iAS8gw453LtccHlxBPIEqCl%2BTXCBbYSP9p4BOIQGvMLQMEEaMFRH4TW32OO9Cr6YdYY4ZsH18kcqw%2B9aGsOhoCSU%2BhMITQ48EGOt8CoV9c%2B9Q6UJ%2BNRxPuKUen0p1LgQwwA5go7lFicdEHenCsTWAZSpvN%2Bz7u7uOK49gl5CbTD4H6imMbkLBKHAocSsPW3BoFMklW%2F5NX6tsydYMG0juyJdAqECk0LWf3UFtVqYi6WmbKIrF1%2F6cjXp1gxyc5hVfMGqOoXEwwUxW6%2BA3xtwSXqTZ1Ezi5JUclWEN6cebgMgFvPue4xEP58UrBoo1ogfVOCTc4BgrWdF3G3cUNYoKorP%2F3RTdqje3lgh7XIhJ%2BDGN8x3L9ox4GfvW7kDR%2FfcjkxHiVjqlcopcYChjUQvb%2FF3nb6JAOVymd1y1RJnvZ34%2FdtTqESkBns6VpkGl3pPH9XXjyzc6YpJ7%2BIjVlEMrIA1gMrNXZC3sVQkCbPzLV2RHuaQZBa7yiEJlspm053pN8%2FLMNlDmRTLIZnNmcimG%2BlAkXqBZG%2BMdJCKfoERLTIKdkCzP1U5L3wm7J&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5GPSXDJSQQGIB7BV%2F20250529%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250529T230819Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=b8632a8f2d0373e54d175fb0105eea6e98bbe29450ef65eb82b3e60c5044396e';

      video.src = localVideoPath;
      video.load();
      video.play();
    } else if (selectedIndex == 5) {
      const localVideoPath =
        'https://nurinoon-bucket.s3.ap-northeast-2.amazonaws.com/front/cctv_5.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkYwRAIgQbA94XHubyR4r69%2FHZCIZQu%2FCexJHAWKyCMeV%2BqpErUCICBVzHePmX2NCoLUG0GYTtCVciJ%2FOJO4rx90SGVa0VOqKsIDCJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTA3MjgzOTk1MjM3IgwVhY6zI78C%2FRnCR2cqlgNOl6McPyOii1i1sAmZ6fweLAs5DXKyz6cwapQRVARyYA3%2B7Okm4YNgc%2FtlAze7LGw0DA%2FmIfNFUVC5u2A0zC4lBHs1gwCZ3oAJpngL5ZYwnTHSZN9azmHVIXfZEmbLNGww0KEbpd3vOf0vSJljq8V5zsJ3%2FPDD2TaA%2B7SEpj68v3%2FYqhnBxvK4gSi%2Felb7cOm9WkyEOxD6b%2BOXMzn9ENbUfUZ6bTlfNuIzfmXSgkR%2FJGWBxmyEkEvKSN%2B7kMN35hSdxjqC3EOEc5c3sZk%2BOviFmd1buqAxZnDbwTm%2FniHJQ5VSDsQIu9ObA6XfEkrsRP2rCagC7RBxMYh6Gx%2FGopHRhdHCHeVGB23EucXenlYUCy%2BAVGAQfBH%2FA3uihSH3mh%2B%2F6tESJIncDx%2BBzfZJ27VKKVCvP9mUz%2BPre3Ac3R3hB5WNzSrsN%2BgVIwRTyKvI%2BVnao2iAS8gw453LtccHlxBPIEqCl%2BTXCBbYSP9p4BOIQGvMLQMEEaMFRH4TW32OO9Cr6YdYY4ZsH18kcqw%2B9aGsOhoCSU%2BhMITQ48EGOt8CoV9c%2B9Q6UJ%2BNRxPuKUen0p1LgQwwA5go7lFicdEHenCsTWAZSpvN%2Bz7u7uOK49gl5CbTD4H6imMbkLBKHAocSsPW3BoFMklW%2F5NX6tsydYMG0juyJdAqECk0LWf3UFtVqYi6WmbKIrF1%2F6cjXp1gxyc5hVfMGqOoXEwwUxW6%2BA3xtwSXqTZ1Ezi5JUclWEN6cebgMgFvPue4xEP58UrBoo1ogfVOCTc4BgrWdF3G3cUNYoKorP%2F3RTdqje3lgh7XIhJ%2BDGN8x3L9ox4GfvW7kDR%2FfcjkxHiVjqlcopcYChjUQvb%2FF3nb6JAOVymd1y1RJnvZ34%2FdtTqESkBns6VpkGl3pPH9XXjyzc6YpJ7%2BIjVlEMrIA1gMrNXZC3sVQkCbPzLV2RHuaQZBa7yiEJlspm053pN8%2FLMNlDmRTLIZnNmcimG%2BlAkXqBZG%2BMdJCKfoERLTIKdkCzP1U5L3wm7J&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5GPSXDJSQQGIB7BV%2F20250529%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250529T230834Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=ce8938c8fda5d65e23fe5c36967e683d450fce75620c50e76464871796a4539e';

      video.src = localVideoPath;
      video.load();
      video.play();
    }

    return () => {
      hls.destroy();
    };
  }, [selectedIndex, locations]);

  return <S.VideoPlayer ref={videoRef} muted autoPlay playsInline />;
};

export default VideoPlayer;
