import { useRef, forwardRef } from 'react';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((_, ref) => {
  return <input ref={ref} />;
});

SearchInput.displayName = 'SearchInput';

function SearchButton({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Search</button>;
}

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <nav>
        <SearchButton onClick={() => inputRef.current?.focus()} />
      </nav>
      <SearchInput ref={inputRef} placeholder='Type to search...' />
    </>
  );
}
