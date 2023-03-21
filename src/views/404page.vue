
<template>
    <section class="hero is-link is-fullheight has-background-danger">
        <div class="hero-body">
            <div>
                <p class="title">
                    404 Page
                </p>
                <p class="subtitle">
                    Page not found
                </p>
                <button @click="$router.push({ path: '/' })" class="button is-success">Return to timeline page</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Page404',
}


</script>

<style></style>