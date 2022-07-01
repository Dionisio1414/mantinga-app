<template>
    <div class="projects-block">
        <div class="projects-block__container">
            <h2 
                v-if="titleValue"
                class="projects-block__headline projects-block__headline--desktop h4"
                v-html="$sanitize(titleValue)"
            >
            </h2>
            <h2 
                v-if="titleValue"
                class="projects-block__headline projects-block__headline--mobile h5"
                v-html="$sanitize(titleValue)"
            >
            </h2>
            <ProjectsSlider
                ref="projectsSlider"
                :projectsList="projectsList"
            >
            </ProjectsSlider>
            <div class="projects-block__line" :style="{ left: lineLeftPosition }"></div> 
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Action, Getter } from 'nuxt-property-decorator'
import { EStatus } from '~/constants/status'
import { IContentTypeProjectsBlockProperties } from '~/types/content-type-projects-block.interface'
import { IProjects } from '~/types/projects.interface'
import ProjectsSlider from '~/components/common/ProjectsSlider.vue'

@Component({
    components: { ProjectsSlider }
})
export default class ComponentContentTypeProjectsBlock extends Vue {
    @Prop() public properties!: IContentTypeProjectsBlockProperties

    @Getter('projects/projectsList') public projectsList!: IProjects[]
    @Getter('projects/status') public status!: EStatus
    @Getter('projects/error') public error!: Error

    @Action('projects/fetchProjects') public fetchProjects!: () => Promise<any>

    public lineLeftPosition: string = '0'

    public get titleValue(): string {
        return this.properties.title.value ?? null;
    }

    public calculateLinePosition(): void {
        // @ts-ignore
        const rect = this.$refs?.projectsSlider?.$el.getBoundingClientRect()
        this.lineLeftPosition = `-${rect.left}px`
    }

    public async created(): Promise<void> {
        await this.fetchProjects()
    }

    public mounted(): void {
        if(process.client) {
            this.calculateLinePosition()

            window.addEventListener('resize', this.calculateLinePosition)
        }
    }

    public destroyed(): void {
        window.removeEventListener('resize', this.calculateLinePosition)
    }
}
</script>

<style lang="scss" scoped>
.projects-block {
    padding: $space-24 0 $space-56 $space-32;
    @include media-lg {
        padding: $space-56 $space-24;
    }

    &__container {
        position: relative;
        max-width: 1200px;
        margin: auto;
    }

    &__headline {
        text-align: center;
        margin-bottom: $space-32;
        @include media-lg {
            margin-bottom: 28px;
        }

        &--desktop {
            display: none;
            @include media-lg {
                display: block;
            }

        }

        &--mobile {
            display: block;
            @include media-lg {
                display: none;
            }
        }
    }

    &__line {
      display: block;
      width: 100vw;
      position: absolute;
      top: 255px;
      z-index: 10;
      height: 4px;
      background-color: $color-golden;
      @include media-lg {
        top: 266px;
      }
    }
}

</style>
