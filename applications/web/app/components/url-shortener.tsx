import { useCallback, useRef } from 'react'
import { toast } from 'sonner'
import { AlertTriangle } from 'lucide-react'
import { TextField, Text, Flex } from '@radix-ui/themes'
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
      toast.success('Copied to clipboard!')
    }
  }, [shortUrl])

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={shorten} className="space-y-6" noValidate>
        <FormField label="Enter your long URL" error={fieldError} id="url">
          <input
            id="url"
            type="url"
            placeholder="https://example.com/very/long/url"
            {...form.register('url')}
            aria-invalid={!!fieldError}
            aria-describedby={fieldError ? 'url-error' : undefined}
            className={cn(
              'w-full p-4 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800 placeholder-gray-400 bg-white shadow-md'
            )}
          />
        </FormField>

        <StyledButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
        >
          {isSubmitting ? 'Shortening...' : 'Shorten URL'}
        </StyledButton>
      </form>

      {/* Info base URL */}
      <div className="text-center">
        <Text size="2" color="gray" weight="medium">
          Shortened URLs will start with{' '}
          <code className="font-mono bg-indigo-50 px-2.5 py-1 rounded-md text-indigo-700 font-semibold border border-indigo-100">
            {baseUrl}
          </code>
        </Text>
      </div>

      {/* Shortened URL result */}
      {shortUrl && (
        <div className="space-y-6 pt-10 border-t border-slate-200 animate-fade-in">
          <Text
            size="4"
            weight="bold"
            align="center"
            className="text-slate-800 tracking-tight"
          >
            Your shortened URL:
          </Text>

          <Flex gap="3" align="center" wrap="wrap">
              <input
                ref={copyRef}
                value={shortUrl}
                readOnly
                className={cn(
                  'flex-1 p-4 border border-green-300 rounded-lg text-gray-800 bg-green-50 shadow-md font-mono cursor-text'
                )}
              />
            <StyledButton
              variant="copy"
              size="lg"
              type="button"
              onClick={copyToClipboard}
              aria-label="Copy shortened URL"
            >
              Copy
            </StyledButton>
          </Flex>
        </div>
      )}
      {serverError && (
        <div className="p-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl shadow-sm">
          <Flex gap="3" align="center" justify="center">
            <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
            <Text size="3" color="red" weight="medium" align="center">
              {serverError}
            </Text>
          </Flex>
        </div>
      )}
    </div>
  )
}