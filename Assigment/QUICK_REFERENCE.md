# 🚀 Quick Reference Guide - TechBlog

## 📍 File Locations

```
src/
├── views/
│   ├── Home.vue              # Landing page with posts & categories
│   ├── Login.vue             # User login (split-panel design)
│   ├── Register.vue          # User registration (split-panel design)
│   ├── Profile.vue           # User profile with 3 tabs
│   ├── PostDetail.vue        # Article view with comments
│   └── Search.vue            # Search & filter page (NEW)
├── router/
│   └── index.js              # Route definitions
├── App.vue                   # Main navigation & layout
├── main.js                   # Entry point
└── style.css                 # Global styles
```

## 🔑 Key Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Home.vue | Landing page |
| `/login` | Login.vue | User login |
| `/register` | Register.vue | User registration |
| `/profile` | Profile.vue | User account |
| `/post/:id` | PostDetail.vue | Article view |
| `/search` | Search.vue | Search & filter |

## 🎯 Demo Credentials

**Email**: demo@example.com
**Password**: demo123

Available on both Login and Register pages.

## 💾 localStorage Keys

```javascript
// User Account
localStorage.userAccount = {
  name: "string",
  email: "string",
  password: "string",
  bio: "string",
  location: "string",
  website: "string",
  avatar: "data:image/...",
  createdAt: "ISO date string"
}

// Auth State
localStorage.isLoggedIn = "true" | "false"
localStorage.userName = "string"

// Settings
localStorage.userSettings = {
  emailNotifications: boolean,
  darkMode: boolean,
  publicProfile: boolean
}
```

## 🎨 Quick Style Reference

### **Main Gradient**
```css
background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
```

### **Common Classes**
```css
.btn-submit              /* Gradient button */
.form-input             /* Text input styling */
.card-hover             /* Card elevation on hover */
.text-link              /* Blue link with hover */
.section-title          /* Section heading */
```

### **Animations**
```css
@keyframes float         /* Y translation animation */
@keyframes slideInRight  /* Entrance from right */
@keyframes fadeIn        /* Opacity transition */
```

## 🔧 Common Patterns

### **Form Validation**
```javascript
// Validate email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Store error message
errors.value.email = 'Email không hợp lệ';
```

### **localStorage Usage**
```javascript
// Save data
localStorage.setItem('key', JSON.stringify(data));

// Get data
const data = JSON.parse(localStorage.getItem('key') || '{}');

// Remove data
localStorage.removeItem('key');
```

### **Router Navigation**
```javascript
// In template
<router-link to="/path">Link Text</router-link>

// In script
router.push('/path');
```

## 📱 Responsive Breakpoints

```css
/* Desktop (default) */
/* All features visible */

/* Tablet (max-width: 900px) */
.search-bar { display: none; }  /* Hide search */

/* Mobile (max-width: 640px) */
.mobile-menu { display: flex; }  /* Mobile menu toggle */
.container { padding: 0 1rem; }  /* Reduced padding */
```

## ✨ Feature Checklist

### **Authentication**
- [x] Login page with demo account
- [x] Registration with validation
- [x] Password strength indicator
- [x] localStorage persistence
- [x] Logout functionality

### **User Profile**
- [x] Avatar upload
- [x] Personal information
- [x] Password change
- [x] Settings tab
- [x] Account deletion

### **Content**
- [x] Post browsing
- [x] Post details
- [x] Comments system
- [x] Related posts
- [x] Reading time

### **Discovery**
- [x] Category filtering
- [x] Search functionality
- [x] Sorting options
- [x] Bookmarking

### **Design**
- [x] Gradient backgrounds
- [x] Smooth animations
- [x] Responsive layout
- [x] Modern cards
- [x] Vietnamese labels

## 🎯 Testing Checklist

### **Authentication Flow**
- [ ] Try demo account login
- [ ] Create new account
- [ ] Verify error messages
- [ ] Change password
- [ ] Delete account

### **Content Flow**
- [ ] Browse home page
- [ ] Filter by category
- [ ] Read article
- [ ] Post comment
- [ ] Bookmark article

### **Search Flow**
- [ ] Search by keyword
- [ ] Filter by category
- [ ] Sort results
- [ ] Click result link

### **Responsive Testing**
- [ ] View on desktop (1200px+)
- [ ] View on tablet (900px)
- [ ] View on mobile (640px)
- [ ] Test mobile menu

## 🐛 Troubleshooting

### **Issue: Form not submitting**
**Solution**: Check that all required fields are filled and validation passes.

### **Issue: Router not working**
**Solution**: Ensure route is defined in `src/router/index.js` and component is imported.

### **Issue: Data not persisting**
**Solution**: Verify localStorage is being used correctly - must stringify objects.

### **Issue: Styles not applying**
**Solution**: Check for CSS specificity issues - scoped styles take precedence.

### **Issue: Mobile menu not showing**
**Solution**: Ensure `showMobileMenu` ref is toggled and responsive breakpoint is reached.

## 📚 Vietnamese Vocabulary

| English | Vietnamese | Used In |
|---------|-----------|---------|
| Login | Đăng nhập | Navigation |
| Register | Đăng ký | Navigation |
| Profile | Hồ sơ | Navigation |
| Logout | Đăng xuất | Dropdown |
| Settings | Cài đặt | Profile |
| Password | Mật khẩu | Forms |
| Email | Email | Forms |
| Comment | Bình luận | PostDetail |
| Search | Tìm kiếm | Navbar |
| Save | Lưu | Buttons |

## 🎨 Color Quick Reference

| Color | HEX | Usage |
|-------|-----|-------|
| Primary Blue | #2a5298 | Links, buttons |
| Dark Blue | #1e3c72 | Headers, text |
| Light Gray | #f5f7fa | Backgrounds |
| White | #ffffff | Cards |
| Text Dark | #333333 | Body text |
| Text Light | #999999 | Secondary text |
| Success | #28a745 | Success messages |
| Error | #dc3545 | Error messages |

## 📞 Support Notes

- Demo account: demo@example.com / demo123
- All data stored in browser localStorage
- No backend/API required
- Responsive on all devices
- Modern browser required (ES6+)

---

**Status**: ✅ Project Complete - Ready to Use!
