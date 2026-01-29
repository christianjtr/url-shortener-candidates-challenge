import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useCallback, useRef, useState } from "react";
import { useNavigation, useActionData, useSubmit } from "react-router";
import type { Route } from "./+types/_index";
import { baseUrl } from "@url-shortener/engine";
import {
  ShortenUrlUseCase,
  ShortCodeGenerator,
  RedisUrlRepository,
} from "@url-shortener/engine";
import type { ShortenFormSchema } from "../lib/schemas";
import { shortenFormSchema } from "../lib/schemas";
import {
  Card,
  Flex,
  Heading,
  Text,
  Button,
  TextField,
  Separator,
} from "@radix-ui/themes";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function loader() {
  return {
    baseUrl: baseUrl ? baseUrl + "/s/" : "-",
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const url = formData.get("url") as string;

  if (!url) {
    return { error: "URL is required" };
  }

  try {
    const repo = new RedisUrlRepository();
    const generator = new ShortCodeGenerator(repo);
    const shortenUseCase = new ShortenUrlUseCase(generator, repo);
    const shortUrl = await shortenUseCase.execute(url);
    return {
      shortenedUrl: `${baseUrl}/s/${shortUrl.code.toString()}`,
    };
  } catch (error) {
    return { error: (error as Error).message || "Failed to shorten URL" };
  }
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "URL Shortener" },
    { name: "description", content: "Shorten your URLs quickly and easily" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { baseUrl } = loaderData;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  const [generatedShortUrl, setGeneratedShortUrl] = useState<string | null>(null);
  const serverError = actionData?.error as string | null;

  const form = useForm<ShortenFormSchema>({
    resolver: zodResolver(shortenFormSchema),
    defaultValues: { url: "" },
  });

  const copyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.shortenedUrl) {
      setGeneratedShortUrl(actionData.shortenedUrl);
      toast.success("URL shortened successfully!");
      form.reset();
    }
  }, [actionData?.shortenedUrl, form]);

  const onSubmit = (data: ShortenFormSchema) => {
    submit(data, { method: "post" });
  };

  const copyToClipboard = useCallback(async () => {
    if (copyRef.current && generatedShortUrl) {
      await navigator.clipboard.writeText(generatedShortUrl);
      toast.success("Copied to clipboard!");
    }
  }, [generatedShortUrl]);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minHeight="100vh"
      p={{ initial: "4", sm: "6", lg: "8" }}
      style={{ backgroundColor: "var(--gray-1)" }}
    >
      <Card size="3" style={{ width: "100%", maxWidth: 480 }}>
        <Flex direction="column" gap="5">
          <Heading size="6" align="center">
            URL Shortener
          </Heading>

          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <Flex direction="column" gap="3">
              <TextField.Root
                id="url"
                placeholder="https://example.com/very/long/url"
                size="3"
                {...form.register("url")}
                aria-invalid={!!form.formState.errors.url}
                aria-describedby={form.formState.errors.url ? "url-error" : undefined}
              />

              {form.formState.errors.url && (
                <Text
                  id="url-error"
                  size="2"
                  color="red"
                  role="alert"
                  aria-live="polite"
                >
                  {form.formState.errors.url.message}
                </Text>
              )}

              <Button
                type="submit"
                size="3"
                variant="solid"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Shortening..." : "Shorten URL"}
              </Button>
            </Flex>
          </form>

          <Text size="2" align="center" color="gray">
            Shortened URLs will start with {baseUrl}
          </Text>

          {generatedShortUrl && (
            <>
              <Separator my="4" size="4" />
              <Flex direction="column" gap="3">
                <Text size="2" weight="medium">
                  Your shortened URL:
                </Text>
                <Flex gap="2" align="center">
                  <TextField.Root
                    ref={copyRef}
                    value={generatedShortUrl}
                    readOnly
                    size="3"
                    style={{ flex: 1, fontFamily: "monospace" }}
                  />
                  <Button
                    variant="soft"
                    size="2"
                    onClick={copyToClipboard}
                    aria-label="Copy shortened URL to clipboard"
                  >
                    <Copy size={16} />
                  </Button>
                </Flex>
              </Flex>
            </>
          )}

          {serverError && (
            <Text size="2" color="red" align="center" weight="medium">
              {serverError}
            </Text>
          )}
        </Flex>
      </Card>
    </Flex>
  );
}