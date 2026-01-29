import { useCallback, useRef } from 'react'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'
import { FormField } from './ui/form-field'
import { StyledButton } from './ui/styled-button'
import { cn } from '../lib/utils'
import { useUrlShortener } from '../hooks/useUrlShortener'

interface UrlShortenerProps {
  baseUrl: string
}

export const UrlShortener = ({ baseUrl }: UrlShortenerProps) => {
  const { form, shorten, isSubmitting, shortUrl, serverError, fieldError } = useUrlShortener()
  const copyRef = useRef<HTMLInputElement>(null)

  const copyToClipboard = useCallback(async () => {
    if (copyRef.current && shortUrl) {
      await navigator.clipboard.writeText(shortUrl)
      toast.success('Copied!')
    }
  }, [shortUrl])

  return (
    <div className="space-y-6">
      <form onSubmit={shorten} className="space-y-4" noValidate>
        <FormField label="Enter your long URL" error={fieldError} id="url">
          <input
            id="url"
            {...form.register('url')}
            type="url"
            placeholder="https://example.com/very/long/url"
            className={cn(
              'w-full h-14 rounded-2xl border-2 bg-white px-6 py-4 text-lg shadow-sm transition-all duration-300 ease-in-out',
              'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-0',
              'placeholder:text-slate-400 invalid:border-red-400 invalid:focus:ring-red-500/30'
            )}
            aria-invalid={!!fieldError}
            aria-describedby={fieldError ? 'url-error' : undefined}
          />
        </FormField>
        <StyledButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Shorten URL
        </StyledButton>
      </form>
      <div className="text-center p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">
          Shortened URLs start with{' '}
          <code className="font-mono bg-slate-200 px-2 py-1 rounded-lg text-slate-800 font-semibold">
            {baseUrl}
          </code>
        </p>
      </div>
      {shortUrl && (
        <div className="space-y-4 pt-8 border-t border-slate-200">
          <p className="text-center text-xl font-bold text-slate-800 animate-fade-in">
            Your shortened URL:
          </p>
          <div className="flex gap-4">
            <input
              ref={copyRef}
              value={shortUrl}
              readOnly
              className={cn(
                'flex-1 h-16 rounded-2xl border-2 px-6 py-4 text-xl font-mono shadow-lg cursor-pointer transition-all duration-300 ease-in-out select-all',
                'bg-gradient-to-r from-emerald-50 via-sky-50 to-emerald-50 border-emerald-300 hover:shadow-xl hover:border-emerald-400 hover:scale-[1.01] focus:ring-4 focus:ring-emerald-500/40'
              )}
            />
            <StyledButton
              variant="copy"
              size="lg"
              type="button"
              onClick={copyToClipboard}
              className="px-8 shadow-xl"
            >
              <Copy size={24} />
            </StyledButton>
          </div>
        </div>
      )}
      {serverError && (
        <div className="p-8 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl shadow-2xl animate-pulse">
          <p className="text-xl font-bold text-red-900 text-center leading-tight">
            {serverError}
          </p>
        </div>
      )}
    </div>
  )
}