export default function PixelCircle({ className, viewBox }: React.SVGProps<SVGElement>) {
  return (
    <svg
      className={className}
      viewBox={viewBox || '0 0 24 25'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 7.25C8.75 5.45507 10.2051 4 12 4C13.7949 4 15.25 5.45508 15.25 7.25V8.5H8.75V7.25ZM7.25 8.5702V7.25C7.25 4.62665 9.37665 2.5 12 2.5C14.6234 2.5 16.75 4.62665 16.75 7.25V8.5702C18.6006 8.92125 20 10.5472 20 12.5V18.5C20 20.7091 18.2091 22.5 16 22.5H8C5.79086 22.5 4 20.7091 4 18.5V12.5C4 10.5472 5.39935 8.92125 7.25 8.5702ZM14 15.5C14 16.6046 13.1046 17.5 12 17.5C10.8954 17.5 10 16.6046 10 15.5C10 14.3954 10.8954 13.5 12 13.5C13.1046 13.5 14 14.3954 14 15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
