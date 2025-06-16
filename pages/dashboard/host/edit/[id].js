// pages/dashboard/host/edit/[id].js
import { useRouter } from 'next/router';
import { ListSpaceProvider } from '../../../../context/ListSpaceContext';
import ListSpaceWizard from '../../../../components/list-your-space/ListSpaceWizard';
import AuthGuard from '../../../../components/AuthGuard';

export default function EditListingPage() {
    const router = useRouter();
    const { id } = router.query; // Get the listing ID from the URL

    return (
        <AuthGuard allowedRoles={['host']}> 
            <ListSpaceProvider>
                {/* Render the wizard in EDIT mode by passing the listingId */}
                {id && <ListSpaceWizard listingId={id} />}
            </ListSpaceProvider>
        </AuthGuard>
    );
}