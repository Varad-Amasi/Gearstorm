import { useCallback, useState } from 'react';
import { Button } from '@/components/common/Button';
import { PAYMENT } from '@/utils/competition';

/**
 * UPI QR + VPA for registration fee payment.
 */
export const PaymentDetails = (): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const copyUpiId = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(PAYMENT.upiId);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
      <div className="mx-auto w-full max-w-[14rem] shrink-0">
        <img
          src={PAYMENT.qrSrc}
          alt={PAYMENT.qrAlt}
          width={224}
          height={224}
          className="h-auto w-full rounded-lg border border-border bg-white p-2"
        />
      </div>
      <div className="flex flex-col gap-4 text-center md:text-left">
        <div>
          <p className="font-subhead text-sm font-semibold uppercase tracking-widest text-accent">
            Pay via UPI
          </p>
          <p className="mt-2 font-sans text-text-muted">{PAYMENT.note}</p>
        </div>
        <div>
          <p className="text-sm text-text-subtle">UPI ID</p>
          <p className="mt-1 break-all font-mono text-lg font-semibold text-text-light">
            {PAYMENT.upiId}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              void copyUpiId();
            }}
          >
            {copied ? 'Copied' : 'Copy UPI ID'}
          </Button>
          <a
            href={`upi://pay?pa=${encodeURIComponent(PAYMENT.upiId)}&pn=${encodeURIComponent('GearStorm 2.0')}`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-transparent px-3 py-2 font-subhead text-sm font-semibold text-text-light transition-colors duration-normal hover:bg-dark-800"
          >
            Open UPI app
          </a>
        </div>
        <p className="text-xs text-text-subtle">
          After paying, keep the UTR / UPI reference number and a screenshot —
          both are required in the registration form.
        </p>
      </div>
    </div>
  );
};
