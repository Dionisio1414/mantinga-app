<template>
    <div class="projects-slider">
        <client-only>
            <swiper
            v-if="projectsList && projectsList.length"
                class="projects-slider__swiper"
                :options="sliderOptions"
            >
                <swiper-slide 
                    v-for="(project, index) in projectsList" 
                    :key="index"
                >
                    <ProjectCard 
                        :cardData="project"
                    >
                    </ProjectCard>
                </swiper-slide>
            </swiper>
        </client-only>
        <div v-if="projectsList && projectsList.length > slidesPerViewDesktop" class="projects-slider__controls">
            <div class="projects-swiper-button-prev">
                <svg-icon
                    class="swiper__icon"
                    name="chevron-left"
                    width="24"
                    height="24"
                />
            </div>
            <div class="projects-swiper-button-next">
                <svg-icon
                    class="swiper__icon"
                    name="chevron-right"
                    width="24"
                    height="24"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IProjects } from '~/types/projects.interface'
import ProjectCard from '~/components/cards/ProjectCard.vue'

@Component({
    components: { ProjectCard }
})
export default class ComponentHistorySlider extends Vue {
    @Prop() public projectsList!: IProjects[]
   
    public slidesPerViewDesktop: number = 4

    public sliderOptions = {
        slidesPerView: 'auto',
        spaceBetween: 24,
        slideToClickedSlide: false,
        breakpoints: {
            992: {
                allowTouchMove: true,
                slidesPerView: this.slidesPerViewDesktop,
            },
        },
        navigation: {
            nextEl: '.projects-swiper-button-next',
            prevEl: '.projects-swiper-button-prev',
            disabledClass: 'projects-swiper-button-disabled'
        }
    }

}
</script>

<style lang="scss" scoped>
.projects-slider {
    position: relative;
    width: 100%;
    height: auto;
    &__controls {
        display: none;
        justify-content: space-between;
        position: absolute;
        top: calc(50% - 50px);
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 80px);
        height: 25px;
        @include media-lg {
            display: flex;
        }

    }

    &__swiper {
        padding: 5px 5px 5px 32px;
        @include media-lg {
            padding: 5px;
        }

        .swiper-slide {
            width: 246px;
            height: auto;
            @include media-lg {
                width: auto;
            }
        }
    }

    .projects-swiper-button-next,
    .projects-swiper-button-prev {
        position: static;
        display: block;
        z-index: 100;
        width: 24px;
        height: 24px;
        color: black;
        margin: 0;
        cursor: pointer;

        &:after {
            display: none;
        }
    }

    .projects-swiper-button-disabled {
        opacity: 0.5;
    }
}

</style>