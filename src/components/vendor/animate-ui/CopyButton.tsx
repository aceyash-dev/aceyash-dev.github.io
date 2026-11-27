import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CopyIcon } from '@solar-icons/react/linear/copy';
import { CheckCircleIcon } from '@solar-icons/react/linear/check-circle';

type CopyButtonProps = {
  content: string;
  label?: string;
  delay?: number;
  className?: string;
};

/**
 * Animate UI CopyButton: spring press + blur-crossfade between copy and check state.
 */
export function CopyButton({
  content,
  label = 'Copy to clipboard',
  delay = 2200,
  className = ''
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), delay);
    } catch {
      // Fallback ignored when clipboard permission is unavailable
    }
  };

  return (
    <motion.button
      type="button"
      onClick={() => void handleCopy()}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 550, damping: 30 }}
      className={`animate-copy-btn ${className}`.trim()}
      data-copied={copied ? 'true' : 'false'}
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied!' : label}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="animate-copy-btn__icon animate-copy-btn__icon--ok"
          >
            <CheckCircleIcon size={15} aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="animate-copy-btn__icon"
          >
            <CopyIcon size={15} aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
