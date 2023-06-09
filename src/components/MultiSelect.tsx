// react
import {
  Fragment,
  useState,
  useEffect,
  type FC,
  type Dispatch,
  type SetStateAction,
} from "react";

// Headless-UI
import { Listbox, Transition } from "@headlessui/react";

// heroicons
import { CheckIcon } from "@heroicons/react/20/solid";

interface SelectOption {
  label: string;
  value: string;
}

interface IProps {
  options: SelectOption[];
  placeholder: string;
  selectedOptions: SelectOption[];
  setSelectedOptions: Dispatch<SetStateAction<SelectOption[]>>;
  name: string;
}

const MultiSelect: FC<IProps> = ({
  options,
  placeholder,
  selectedOptions,
  setSelectedOptions,
  name,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (value: string[]) => {
    const result: SelectOption[] = [];
    options.forEach((option) => {
      if (value.includes(option.value)) {
        result.push(option);
      }
    });

    setSelectedOptions(result);
  };

  const handleDelete = (value: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option.value !== value
    );
    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    const newValues = selectedOptions.map((option) => option.value);
    setSelectedValues(newValues);
  }, [selectedOptions]);

  return (
    <Listbox multiple value={selectedValues} onChange={handleSelect} as="div">
      <Listbox.Button
        className={`select-bordered select relative flex h-auto w-full items-stretch`}
      >
        <div className="flex flex-wrap items-center">
          {selectedOptions.map((option) => {
            return (
              <div
                key={option.value}
                className="relative mb-1 mr-2 mt-1 rounded-md bg-accent px-2"
              >
                <span className="mr-6 whitespace-nowrap text-xs">
                  {option.label}
                </span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(option.value);
                  }}
                  className="absolute right-0 top-0 flex h-full w-6 items-center justify-center rounded-r-md bg-base-200 hover:bg-base-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </div>
            );
          })}
          {selectedOptions.length === 0 && (
            <span className="font-normal text-gray-400">{placeholder}</span>
          )}
        </div>
      </Listbox.Button>
      <div className="relative z-10">
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={option.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default MultiSelect;
