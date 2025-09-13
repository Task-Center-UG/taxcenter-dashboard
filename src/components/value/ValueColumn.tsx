import { formatText } from "@/utils/useFormatter";

interface ValueColumn {
  label: string;
  value: any;
  url?: string;
  chip?: string;
  center?: boolean;
}

export const ValueColumn = (props: ValueColumn) => {
  const { label, value, url, center = false } = props;

  return (
    <div className={`flex flex-col gap-1 ${center ? "items-center" : ""}`}>
      <div className="font-semibold">{formatText(label)}</div>
      {url ? (
        <a href={url} className="text-blue-500 hover:underline">
          {value}
        </a>
      ) : (
        <div className="whitespace-pre-line">{value}</div>
      )}
    </div>
  );
};
