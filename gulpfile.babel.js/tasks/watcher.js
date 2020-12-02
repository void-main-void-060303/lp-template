import gulp from 'gulp'

function run(targets, tasks) {
  gulp.watch(
    targets,
    tasks,
  )
    .on('add', (path) => {
      console.log(`File ${path} was added`)
    })
    .on('change', (path) => {
      console.log(`File ${path} was changed`)
    })
    .on('unlink', (path) => {
      console.log(`File ${path} was removed`)
    })
}

export default {
  run,
}
