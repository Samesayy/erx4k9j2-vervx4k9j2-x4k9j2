// pages/list-your-space/index.js
import { ListSpaceProvider } from '../../context/ListSpaceContext';
import ListSpaceWizard from '../../components/list-your-space/ListSpaceWizard';
import AuthGuard from '../../components/AuthGuard';

export default function CreateListingPage() {
    return (
        <AuthGuard allowedRoles={['host']}> 
            <ListSpaceProvider>
                {/* Render the wizard in CREATE mode (no listingId passed) */}
                <ListSpaceWizard />
            </ListSpaceProvider>
        </AuthGuard>
    );
}