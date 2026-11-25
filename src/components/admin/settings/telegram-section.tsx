"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { sendTelegramTestAction } from "@/actions/setting.actions";
import { Icon } from "@/components/shared/icon";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button } from "@/components/ui/button";
import { TELEGRAM_EVENTS } from "@/config/settings";
import type { TelegramStatus } from "@/types/setting";
import { SettingsSectionHeader } from "./settings-field";
import type { SectionProps } from "./settings-types";

type TelegramSectionProps = SectionProps<"notifications"> & { status: TelegramStatus | null };

export function TelegramSection({ value, onChange, status }: TelegramSectionProps) {
  const [isSending, startSending] = useTransition();
  const configured = !!status?.configured;

  const sendTest = () =>
    startSending(async () => {
      const result = await sendTelegramTestAction();
      if (result.success) toast.success("Test message sent", { description: `Check the ${status?.chatTitle ?? "staff"} group` });
      else toast.error("Couldn’t send test message", { description: result.message });
    });

  return (
    <div className="flex flex-col gap-5">
      <SettingsSectionHeader title="Telegram alerts" description="Choose which events post to the staff Telegram group." />

      {configured ? (
        <div className="flex flex-wrap items-center gap-3 rounded-[14px] bg-info-soft px-4.5 py-4">
          <span className="flex size-10 flex-none items-center justify-center rounded-[10px] bg-surface text-info">
            <Icon name="send" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="font-semibold text-ink">
              {status?.chatTitle ? `Connected to “${status.chatTitle}”` : "Connected to Telegram"}
            </span>
            <span className="text-xs text-ink-3">{status?.botUsername ? `Bot @${status.botUsername}` : "Bot token and chat are set"}</span>
          </span>
          <ToggleSwitch
            ariaLabel="Send alerts to Telegram"
            label={<span className="text-[13px] text-ink-2">Alerts on</span>}
            checked={value.telegramEnabled}
            onChange={(telegramEnabled) => onChange({ telegramEnabled })}
          />
          <Button variant="outline" size="sm" onClick={sendTest} aria-busy={isSending || undefined}>
            {isSending ? "Sending…" : "Send test message"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-[14px] bg-warning-soft px-4.5 py-4">
          <span className="flex size-10 flex-none items-center justify-center rounded-[10px] bg-surface text-warning">
            <Icon name="alert" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="font-semibold text-ink">Telegram isn’t connected</span>
            <span className="text-xs text-ink-3">Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to the server’s .env, then restart it.</span>
          </span>
        </div>
      )}

      <div className="flex flex-col">
        {TELEGRAM_EVENTS.map((event) => (
          <ToggleSwitch
            key={event.type}
            className="justify-between border-b border-line py-4"
            disabled={!configured || !value.telegramEnabled}
            label={
              <span className="flex flex-col">
                <span className="font-medium text-ink">{event.label}</span>
                <span className="text-xs text-ink-3">{event.description}</span>
              </span>
            }
            checked={value.events[event.type]?.telegram ?? false}
            onChange={(telegram) => onChange({ events: { ...value.events, [event.type]: { telegram } } })}
          />
        ))}
      </div>
    </div>
  );
}
