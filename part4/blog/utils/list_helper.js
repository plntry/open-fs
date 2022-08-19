const dummy = (blogs) => {
    return Number(blogs + 1)
}

const totalLikes = (blogs) => {
    if (!Array.isArray(blogs) || !blogs.length) return 0

    if (blogs.length === 1) return blogs[0].likes

    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}

    return blogs.reduce((last_blog, current_blog) => {
        current_blog.likes > last_blog.likes ? current_blog : last_blog
    })
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}