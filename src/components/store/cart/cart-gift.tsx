import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { TextArea } from "@/components/store/ui/text-area";
import { GIFT_NOTE_MAX } from "@/config/store-cart";

type CartGiftProps = {
  gift: boolean;
  note: string;
  onToggle: () => void;
  onNote: (note: string) => void;
};

export function CartGift({ gift, note, onToggle, onNote }: CartGiftProps) {
  return (
    <div className="rounded-[20px] border border-[#f0ebe6] bg-white px-3 py-2">
      <button
        type="button"
        role="switch"
        aria-checked={gift}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-2.5 border-0 bg-transparent px-2 py-2.5 text-ink"
      >
        <span className="flex items-center gap-3">
          <span className="flex size-[42px] items-center justify-center rounded-[12px] bg-[#fdeaf0] text-[#c2185b]">
            <Icon name="gift" size={20} strokeWidth={1.8} />
          </span>
          <span className="flex flex-col gap-0.5 text-left">
            <b className="font-sans text-[13.5px] leading-[1.2] font-medium">Send as a gift</b>
            <small className="text-[11.5px] text-[#8a7f79]">Gift wrap + handwritten card · ৳60</small>
          </span>
        </span>
        <span
          className={cn(
            "relative h-6 w-[42px] flex-none rounded-full transition-[background-color] duration-200",
            gift ? "bg-brand" : "bg-[#e2dad4]",
          )}
        >
          <i
            className={cn(
              "absolute top-[3px] left-[3px] size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200",
              gift && "translate-x-[18px]",
            )}
          />
        </span>
      </button>
      {gift && (
        <div className="flex flex-col gap-2 px-2 pt-1 pb-3">
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[#3f3531]">
            <span className="flex">
              Message on the card
              <i className="ml-1.5 text-xs font-normal text-[#a69b95] not-italic">{GIFT_NOTE_MAX - note.length} left</i>
            </span>
            <TextArea
              rows={3}
              maxLength={GIFT_NOTE_MAX}
              placeholder="Happy birthday Ammu! Love, Rafi"
              value={note}
              onChange={(event) => onNote(event.target.value)}
            />
          </label>
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-[#1f8a4c]">
            <Icon name="check" size={14} strokeWidth={1.8} />
            Prices are hidden on the invoice for gift orders
          </span>
        </div>
      )}
    </div>
  );
}
