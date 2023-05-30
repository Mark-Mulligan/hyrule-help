// react
import { Fragment, useState, FC } from "react";

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
}

const MultiSelect: FC<IProps> = ({ options, placeholder }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);

  const handleSelect = (value: string[]) => {
    console.log(value);

    const result: SelectOption[] = [];
    options.forEach((option) => {
      if (value.includes(option.value)) {
        result.push(option);
      }
    });

    setSelectedOptions(result);
    setSelectedValues(value);
  };

  const handleDelete = (value: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option.value !== value
    );
    setSelectedOptions(newSelectedOptions);
    const newSelectedValues = newSelectedOptions.map((option) => option.value);
    setSelectedValues(newSelectedValues);
  };

  return (
    <div>
      <Listbox multiple value={selectedValues} onChange={handleSelect}>
        <Listbox.Button className="select-bordered select relative w-full">
          <div className="flex h-full items-center">
            {selectedOptions.map((option) => {
              return (
                <div
                  key={option.value}
                  className="relative mr-2 rounded-md bg-accent px-2"
                >
                  <span className="mr-6">{option.label}</span>
                  <button
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
                  </button>
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
    </div>
  );
};

export default MultiSelect;
