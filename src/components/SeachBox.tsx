"use-client";

import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Input } from "./ui/input";

const libraries: Libraries = ["places"];

export default function SeachBox() {
    const googleMapsApiKey: string = process.env.NEXT_PUBLIC_MAPS_API_KEY || "";

    const { isLoaded, loadError } = useGoogleMapsScript({
        googleMapsApiKey,
        libraries,
    });

    if (loadError) {
        console.log(loadError);
        return;
    }
    if (isLoaded) {
        return <AutoComplete />;
    }
    return <></>;
}

export function AutoComplete() {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({ debounce: 300 });

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });
    return (
        <div ref={ref}>
            <Input
                className="mt-2"
                name="location"
                type="location"
                placeholder="Ex: Japan"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    console.log(data);
                    console.log(e.target.value);
                }}
                disabled={!ready}
            ></Input>
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" &&
                data.map(({ place_id, description }) => (
                    <ul key={place_id}>{description}</ul>
                ))}
        </div>
    );
}
