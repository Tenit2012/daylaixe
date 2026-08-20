'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { VideoAsset } from '@/types/content';
import { trackEvent } from '@/lib/analytics/track';
import { AnalyticsEvent } from '@/lib/analytics/events';

interface VideoPlayerProps {
  video: VideoAsset;
  /** Nhan vi tri gui kem su kien analytics. */
  location?: string;
}

/** Doi 37 -> "0:37" de nguoi dung biet truoc video dai bao lau. */
function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Trinh phat video tu luu.
 *
 * Vi sao KHONG render thang the <video> voi thuoc tinh `controls`:
 *  - File video nang ~5,5 MB. Neu de trinh duyet tu tai thi moi nguoi vao
 *    trang deu ton chung ay dung luong du khong ai bam xem - rat ton kem voi
 *    nguoi dung dung 3G/4G.
 *  - Vi vay mac dinh chi hien ANH POSTER (khoang 54 KB). Chi khi nguoi dung
 *    bam nut play thi the <video> moi duoc gan vao trang va bat dau tai.
 *
 * `playsInline` la bat buoc cho iOS - thieu no thi Safari tren iPhone se tu
 * mo video toan man hinh thay vi phat ngay trong trang.
 */
export function VideoPlayer({ video, location = 'video' }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    trackEvent(AnalyticsEvent.ClickVideo, { location, video: video.id });
  };

  return (
    <figure className="card-base overflow-hidden p-0">
      <div className="relative mx-auto aspect-[9/16] w-full max-w-sm bg-brand-900">
        {isPlaying ? (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster.src}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full"
          >
            Trình duyệt của bạn không phát được video này.{' '}
            <a href={video.src} download>
              Tải video về máy
            </a>
            .
          </video>
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Phát video: ${video.title} (${formatDuration(video.durationSeconds)})`}
            className="play-button group relative block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            <Image
              src={video.poster.src}
              alt={video.poster.alt}
              width={video.poster.width}
              height={video.poster.height}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 384px"
              className="h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-brand-900/25 transition-colors group-hover:bg-brand-900/40"
            >
              {/*
                Mot nhip phong to roi ve khi ro chuot vao - chay DUNG MOT LAN
                moi lan ro vao, khong lap. Nut phat dap lien tuc se keo mat
                nguoi doc ra khoi noi dung xung quanh suot thoi gian ho o lai
                muc nay.
              */}
              <span className="play-ring flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-card">
                <Play className="ml-1 h-7 w-7 fill-brand-900 text-brand-900" />
              </span>
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 rounded-md bg-brand-900/80 px-2 py-1 text-xs font-semibold text-white"
            >
              {formatDuration(video.durationSeconds)}
            </span>
          </button>
        )}
      </div>

      <figcaption className="p-4">
        <h3 className="text-base">{video.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          {video.description}
        </p>
      </figcaption>
    </figure>
  );
}
