import styles from './CategoryBanner.module.css';

const categories = [
  { label: 'Technology', value: 'technology' },
  { label: 'Business', value: 'business' },
  { label: 'Sports', value: 'sports' },
  { label: 'Health', value: 'health' },
  { label: 'Science', value: 'science' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'General', value: 'general' },
];

const CategoryBanner = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className={styles.banner}>
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelectCategory(category.value)}
          className={`${styles.categoryButton} ${
            selectedCategory === category.value ? styles.selected : ''
          }`}
        >
        {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryBanner;
