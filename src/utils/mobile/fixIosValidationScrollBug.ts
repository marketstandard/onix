export const fixIosValidationScrollBug = (
  event:
    | React.FocusEvent<HTMLInputElement, Element>
    | React.FocusEvent<HTMLTextAreaElement, Element>
    | React.FocusEvent<HTMLSelectElement, Element>,
) => {
  if (/^iPad|iPhone$/.test(navigator.platform)) {
    event.target.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }
};
