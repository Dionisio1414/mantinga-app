import * as Sentry from '@sentry/browser';

export default function({ $config }: { $config: any }) {
    if (!$config.sentryDsn) {
        console.warn('Sentry dsn is not defined. Sentry initialization skipped');
    }

    Sentry.init({ dsn: $config.sentryDsn });
    Sentry.setTag('mode', 'browser');
}
