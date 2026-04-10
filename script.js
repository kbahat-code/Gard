// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDXJrcY7IVG1Yiyvx2e6lnFiAa8OIcbDTs",
        authDomain: "garden-crop-monitoring.firebaseapp.com",
        projectId: "garden-crop-monitoring",
        storageBucket: "garden-crop-monitoring.firebasestorage.app",
        messagingSenderId: "667577763472",
        appId: "1:667577763472:web:524f42fb26444adac6ba15",
        measurementId: "G-BK097B3970"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    console.log('Firebase initialized');

    // Anonymous Sign-in
    auth.signInAnonymously()
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            console.log('Firebase authenticated - UID:', userId);
            loadData(userId);
        })
        .catch((error) => {
            console.error('Firebase authentication failed:', error);
        });

    // Load Data from Firestore
    function loadData(userId) {
        console.log('Loading from Firebase...');
        db.collection('users').doc(userId).collection('growData').get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log('No data found in Firebase');
                } else {
                    querySnapshot.forEach((doc) => {
                        console.log('Data loaded:', doc.data());
                    });
                }
            })
            .catch((error) => {
                console.error('Error loading data:', error);
            });
    }

    // Save Data to Firestore
    function saveData(userId, data) {
        db.collection('users').doc(userId).collection('growData').add(data)
            .then(() => {
                console.log('Data saved successfully');
            })
            .catch((error) => {
                console.error('Error saving data:', error);
            });
    }

    console.log('GrowManager PRO initialized');
});
