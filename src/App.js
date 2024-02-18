// Εισαγωγή των απαραίτητων βιβλιοθηκών
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

// Κύριος λειτουργικός συνιστώντας (functional component) της εφαρμογής
const App = () => {
    // Κατάσταση (state) που θα αποθηκεύει τη συμβουλή από το API
    const [advice, setAdvice] = useState('');

    // Χρήση του useEffect για τη φόρτωση της συμβουλής μόλις φορτώσει η σελίδα
    useEffect(() => {
        // Δημιουργία μιας συνάρτησης fetchAdvice που θα εκτελεί το αίτημα προς το API
        const fetchAdvice = async () => {
            try {
                // Αποστολή αιτήματος προς το API και αποθήκευση της συμβουλής στην κατάσταση
                const response = await axios.get('https://api.adviceslip.com/advice');
                setAdvice(response.data.slip.advice);
            } catch (error) {
                // Εμφάνιση σφάλματος στην περίπτωση που κάτι πάει στραβά
                console.log(error);
            }
        };

        // Κλήση της fetchAdvice όταν φορτώνεται η σελίδα (κενό array ως δεύτερη παράμετρος στο useEffect)
        fetchAdvice();
    }, []); // Αδειο array σημαίνει ότι το useEffect θα εκτελεστεί μόνο μια φορά κατά τη φόρτωση

    // Συνάρτηση που εκτελείται όταν πατηθεί το κουμπί "MORE ADVICE"
    const handleFetchAdvice = async () => {
        try {
            const response = await axios.get('https://api.adviceslip.com/advice');
            setAdvice(response.data.slip.advice);
        } catch (error) {
            console.log(error);
        }
    };

    // Επιστροφή του JSX που θα εμφανιστεί στη σελίδα
    return (
        <div>
            {/* Κεντράρισμα του περιεχομένου στο κέντρο της σελίδας με χρήση του CSS class 'app' */}
            <div className='app'>
                <div className='container'>
                    {/* Εμφάνιση της συμβουλής ως τίτλος με χρήση του CSS class 'heading' */}
                    <h1 className='heading'>{advice}</h1>
                    {/* Κουμπί με εφέ */}
                    <button className='button' onClick={handleFetchAdvice}>
                        <span>GIVE MORE ADVICE</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Εξαγωγή του App component για χρήση από άλλα μέρη του κώδικα
export default App;

