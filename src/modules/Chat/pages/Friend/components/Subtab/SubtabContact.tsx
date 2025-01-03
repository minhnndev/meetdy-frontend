import { TContact } from "@/models/friend.model";
import ContactCard from "../ContactCard";

const SubtabContact = ({ phoneBook }) => {
    return (
        <div style={{ margin: "1rem 0" }}>
            {phoneBook?.map((contact: TContact) => (
                <ContactCard key={contact._id} contact={contact} />
            ))}
        </div>
    );
};

export { SubtabContact };
