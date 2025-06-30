import { ThemedImage } from './ThemedImage';

export const StatsParticle = () => {
    return (
        <ThemedImage src="/bg_stats_particle.svg" filterLight='brightness(0) saturate(100%) invert(99%) sepia(1%) saturate(2%) hue-rotate(298deg) brightness(108%) contrast(100%)' />
    );
};