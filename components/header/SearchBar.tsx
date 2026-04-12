import { SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

export function SearchBar() {
    return (
        <div className="flex-1 max-w-2xl relative hidden md:block">
            <InputGroup className="bg-slate-100/50 w-full border border-slate-20 py-2.5! px-4! h-[44.5px] rounded-full focus:outline-none! focus:bg-white! focus:ring-2! focus:ring-[#ea580c]/20! focus:border-[#ea580c]!">
                <InputGroupInput type="text" id="inline-start-input" className="text-[15px]! p-0! font-geist block placeholder:text-slate-400" placeholder="Шукати знижки, товари, магазини..." />
                <InputGroupAddon className="p-0 pr-4!" align="inline-start">
                    <SearchIcon className="h-4 w-4 text-slate-400" />
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}   
