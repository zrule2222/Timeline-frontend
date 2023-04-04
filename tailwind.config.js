module.exports = {
    content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            'primary-darken': '#1E3D71',
            'primary-text' : '#0054A6',
            'primary-black': '#414042',
            'white': '#FFFFFF',
            'record-display-primary': '#F4F5F5'
        },
        textColors: {
            
        },
      extend: {
        backgroundImage: {
            'cover-image': "url('src/assets/cover.png')"
            
          }
      },
    },
    plugins: [],
}