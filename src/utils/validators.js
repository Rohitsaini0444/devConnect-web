/**
 * Validation utilities for form inputs
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email address';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  return null;
};

export const validateFirstName = (firstName) => {
  if (!firstName || firstName.trim() === '') return 'First name is required';
  if (firstName.trim().length < 2) return 'First name must be at least 2 characters';
  if (firstName.trim().length > 50) return 'First name must not exceed 50 characters';
  if (!/^[a-zA-Z\s'-]+$/.test(firstName)) return 'First name can only contain letters, spaces, hyphens, and apostrophes';
  return null;
};

export const validateLastName = (lastName) => {
  if (!lastName || lastName.trim() === '') return 'Last name is required';
  if (lastName.trim().length < 2) return 'Last name must be at least 2 characters';
  if (lastName.trim().length > 50) return 'Last name must not exceed 50 characters';
  if (!/^[a-zA-Z\s'-]+$/.test(lastName)) return 'Last name can only contain letters, spaces, hyphens, and apostrophes';
  return null;
};

export const validateAge = (age) => {
  if (!age) return null; // Optional field
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum)) return 'Age must be a valid number';
  if (ageNum < 13) return 'Age must be at least 13';
  if (ageNum > 120) return 'Age must be realistic (≤ 120)';
  return null;
};

export const validateGender = (gender) => {
  if (!gender) return null; // Optional field
  const validGenders = ['male', 'female', 'other', 'prefer not to say'];
  if (!validGenders.includes(gender.toLowerCase())) {
    return `Gender must be one of: ${validGenders.join(', ')}`;
  }
  return null;
};

export const validatePhotoURL = (photoURL) => {
  if (!photoURL) return null; // Optional field
  try {
    new URL(photoURL);
    if (!photoURL.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return 'Photo URL must point to a valid image file (jpg, jpeg, png, gif, webp)';
    }
    return null;
  } catch {
    return 'Photo URL must be a valid URL';
  }
};

export const validateSkills = (skills) => {
  if (!skills || skills.length === 0) return null; // Optional field
  if (skills.length > 50) return 'Maximum 50 skills allowed';
  for (let skill of skills) {
    if (skill.trim().length === 0) return 'Skills cannot be empty';
    if (skill.trim().length > 50) return 'Each skill must not exceed 50 characters';
  }
  return null;
};

export const validateAbout = (about) => {
  if (!about) return null; // Optional field
  if (about.trim().length > 500) return 'About section must not exceed 500 characters';
  return null;
};

/**
 * Validate entire login form
 */
export const validateLoginForm = (email, password) => {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};

/**
 * Validate entire signup form
 */
export const validateSignupForm = (firstName, lastName, email, password) => {
  const errors = {};
  
  const firstNameError = validateFirstName(firstName);
  const lastNameError = validateLastName(lastName);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (firstNameError) errors.firstName = firstNameError;
  if (lastNameError) errors.lastName = lastNameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};

/**
 * Validate entire edit profile form
 */
export const validateEditProfileForm = (profile) => {
  const errors = {};

  const { firstName, lastName, age, gender, photoURL, skills, about } = profile;

  const firstNameError = validateFirstName(firstName);
  const lastNameError = validateLastName(lastName);
  const ageError = validateAge(age);
  const genderError = validateGender(gender);
  const photoURLError = validatePhotoURL(photoURL);
  const skillsError = validateSkills(skills);
  const aboutError = validateAbout(about);

  if (firstNameError) errors.firstName = firstNameError;
  if (lastNameError) errors.lastName = lastNameError;
  if (ageError) errors.age = ageError;
  if (genderError) errors.gender = genderError;
  if (photoURLError) errors.photoURL = photoURLError;
  if (skillsError) errors.skills = skillsError;
  if (aboutError) errors.about = aboutError;

  return errors;
};
