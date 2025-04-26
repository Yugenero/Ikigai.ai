import { 
	GoogleAuthProvider, 
	signInWithCredential, 
	OAuthProvider
  } from 'firebase/auth';
  import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
  import { auth, db } from './firebaseconfig';
  
  // Google Sign-in
// Interface for Google sign-in parameters
interface GoogleSignInCredential {
	idToken: string;
}

// Interface for user return type
interface FirebaseUser {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
}

export const googleSignIn = async (idToken: string): Promise<FirebaseUser> => {
	try {
		// Create a credential with the ID token
		const credential = GoogleAuthProvider.credential(idToken);
		
		// Sign in with the credential
		const userCredential = await signInWithCredential(auth, credential);
		const user = userCredential.user as FirebaseUser;
		await saveUserToFirestore(user);
		return user;
	} catch (error) {
		console.error('Error signing in with Google:', error);
		throw error;
	}
};
  
  // Apple Sign-in
  export const appleSignIn = async (credential: any) => {
	try {
	  // Use the identityToken from Apple auth to create firebase credential
	  const { identityToken, nonce } = credential;
	  
	  // Create an OAuthProvider credential
	  const provider = new OAuthProvider('apple.com');
	  const oAuthCredential = provider.credential({
		idToken: identityToken,
		rawNonce: nonce, // Prevents replay attacks
	  });
	  
	  // Sign in with credential
	  const userCredential = await signInWithCredential(auth, oAuthCredential);
	  const user = userCredential.user;
	  
	  // Use the Apple-provided name info if available (only provided on first sign-in)
	  const displayName = credential.fullName
		? `${credential.fullName.givenName || ''} ${credential.fullName.familyName || ''}`.trim()
		: user.displayName || undefined;
	  
	  // Save user data to Firestore (if new user)
	  await saveUserToFirestore(user, { displayName });
	  
	  return user;
	} catch (error) {
	  console.error('Error signing in with Apple:', error);
	  throw error;
	}
  };
  
// Save user data to Firestore
const saveUserToFirestore = async (user: { uid: string; email: string | null; displayName: string | null; photoURL: string | null; }, additionalData: { displayName?: string } = {}) => {
	try {
	  // Check if user already exists in Firestore
	  const userRef = doc(db, 'users', user.uid);
	  const userDoc = await getDoc(userRef);
	  
	  if (!userDoc.exists()) {
		// User doesn't exist yet, create a new document
		const userData = {
		  uid: user.uid,
		  email: user.email,
		  displayName: additionalData.displayName || user.displayName || '',
		  photoURL: user.photoURL || '',
		  createdAt: serverTimestamp(),
		  lastLogin: serverTimestamp(),
		};
		
		await setDoc(userRef, userData);
	  } else {
		// User exists, update last login time
		await setDoc(userRef, {
		  lastLogin: serverTimestamp()
		}, { merge: true });
	  }
	} catch (error) {
	  console.error('Error saving user to Firestore:', error);
	  // Don't throw error here, as the authentication was successful
	}
  };
  
  // Sign out
  export const signOut = async () => {
	try {
	  await auth.signOut();
	} catch (error) {
	  console.error('Error signing out:', error);
	  throw error;
	}
  };