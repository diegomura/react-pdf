const CONTENT_COLOR = '#d1e3f3';
const PADDING_COLOR = '#e2efdd';
const MARGIN_COLOR = '#fce6d0';

interface ItemProps {
  color: string;
  children: string;
}

function Item({ color, children }: ItemProps) {
  return (
    <div className="mb-2 ml-2 flex items-center sm:ml-0">
      <div className="mr-2 h-5 w-5" style={{ background: color }} />
      <span>{children}</span>
    </div>
  );
}

export function DebugSample() {
  return (
    <div
      role="img"
      aria-label="Box model diagram: a blue content box surrounded by a green padding band and an orange margin band, sized 460 by 370."
      className="my-14 flex flex-col items-center justify-center sm:flex-row"
    >
      <div className="relative w-full border-[30px] border-[#fce6d0] sm:w-auto">
        <span className="absolute -top-12 -left-[30px] block text-[10px]">
          460x370
        </span>
        <div className="h-[200px] w-full border-y-[30px] border-[#e2efdd] bg-[#d1e3f3] sm:h-[250px] sm:w-[400px]" />
      </div>
      <div className="mt-10 flex w-auto flex-row sm:mt-0 sm:ml-10 sm:w-[200px] sm:flex-col">
        <Item color={CONTENT_COLOR}>Content</Item>
        <Item color={PADDING_COLOR}>Padding</Item>
        <Item color={MARGIN_COLOR}>Margin</Item>
      </div>
    </div>
  );
}
