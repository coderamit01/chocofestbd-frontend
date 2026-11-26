"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { sendTelegramTestAction } from "@/actions/setting.actions";
import { Icon } from "@/components/shared/icon";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NOTIFICATION_SEVERITY_BADGES, NOTIFICATION_TYPES } from "@/config/notifications";
import { TELEGRAM_EVENTS } from "@/config/settings";
import { tableStyles } from "@/lib/table-styles";
import { cn } from "@/lib/utils";
import type { TelegramStatus } from "@/types/setting";
import { SettingsCallout, SettingsEyebrow, SettingsMethodHeader, SettingsPanel, SettingsSectionHeader, SettingsTile } from "./settings-field";
import type { SectionProps } from "./settings-types";

type TelegramSectionProps = SectionProps<"notifications"> & { status: TelegramStatus | null };

export function TelegramSection({ value, onChange, status }: TelegramSectionProps) {
  const [isSending, startSending] = useTransition();
  const configured = !!status?.configured;
  const telegramOff = !configured || !value.telegramEnabled;
  const enabledCount = TELEGRAM_EVENTS.filter((event) => value.events[event.type]?.telegram).length;

  const subtitle = !value.telegramEnabled
    ? "Off — staff get alerts in the dashboard only"
    : configured
      ? status?.chatTitle
        ? `Connected to “${status.chatTitle}”`
        : "Connected to Telegram"
      : "Add the bot token and group ID";

  const sendTest = () =>
    startSending(async () => {
      const result = await sendTelegramTestAction();
      if (result.success) toast.success("Test message sent", { description: `Check the ${status?.chatTitle ?? "staff"} group` });
      else toast.error("Can’t send yet", { description: result.message });
    });

  return (
    <div className="flex flex-col gap-6">
      <SettingsSectionHeader title="Notifications" description="Staff alerts on Telegram." />

      <SettingsPanel>
        <SettingsMethodHeader badge={<SettingsTile icon="send" tone="sky" />} title="Telegram" subtitle={subtitle}>
          <ToggleSwitch
            ariaLabel="Enable Telegram"
            checked={value.telegramEnabled}
            onChange={(telegramEnabled) => onChange({ telegramEnabled })}
          />
        </SettingsMethodHeader>

        {value.telegramEnabled &&
          (configured ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={sendTest} aria-busy={isSending || undefined}>
                <Icon name="send" size={17} strokeWidth={1.8} />
                {isSending ? "Sending…" : "Send test message"}
              </Button>
              {status?.botUsername && <span className="text-xs text-ink-3">Bot @{status.botUsername}</span>}
            </div>
          ) : (
            <SettingsCallout tone="warning">
              Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to the server’s .env, then restart it.
            </SettingsCallout>
          ))}
      </SettingsPanel>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <SettingsEyebrow>Staff alerts by event</SettingsEyebrow>
          <span className="text-xs text-ink-3">{enabledCount} on Telegram</span>
        </div>
        <div className={tableStyles.wrapper}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={tableStyles.head}>Event</th>
                <th className={tableStyles.head}>Priority</th>
                <th className={cn(tableStyles.head, "text-center")}>Telegram</th>
              </tr>
            </thead>
            <tbody className={tableStyles.body}>
              {TELEGRAM_EVENTS.map((event) => {
                const type = NOTIFICATION_TYPES[event.type];
                const priority = NOTIFICATION_SEVERITY_BADGES[event.priority];

                return (
                  <tr key={event.type} className={tableStyles.row}>
                    <td data-label="Event" className={tableStyles.cell}>
                      <span className="flex items-center gap-3">
                        <SettingsTile icon={type.listIcon ?? type.icon} tone={type.tile} small />
                        <span className="flex flex-col text-left">
                          <span className="font-medium text-ink">{event.label}</span>
                          <span className="text-xs text-ink-3">{event.description}</span>
                        </span>
                      </span>
                    </td>
                    <td data-label="Priority" className={tableStyles.cell}>
                      <Badge size="sm" variant={priority.variant}>
                        {priority.label}
                      </Badge>
                    </td>
                    <td data-label="Telegram" className={cn(tableStyles.cell, "text-center")}>
                      <ToggleSwitch
                        ariaLabel={`Telegram: ${event.label}`}
                        disabled={telegramOff}
                        checked={value.events[event.type]?.telegram ?? false}
                        onChange={(telegram) => onChange({ events: { ...value.events, [event.type]: { telegram } } })}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
