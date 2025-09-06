function binarySort(list: number[], toFound: number){
    let index = -1
    const logged = Math.ceil(Math.log2(list.length))

    for (let i = 0; i < logged; i++) {
        if (i == 0) {
            index = list.length / 2
        } else  {
            const endValue = list[index - 1] ?? -1;
            const firstValue = list[index] ?? -1;

            if (endValue > toFound)
                index = index - Math.round(list.length / Math.pow(2, i + 1))
            else if (firstValue < toFound)
                index = index + Math.round(list.length / Math.pow(2, i + 1))
        }

        if (list[index - 1] == toFound){
            index -= 1
            break
        } else if (list[index] == toFound)
            break
    }

    return index
}

//const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128]

//console.log(binarySort(list, 92))


document.addEventListener('DOMContentLoaded', (_: Event) => {
    const fileInput = document.getElementById("arquivo") as HTMLInputElement;
    const toFind = document.getElementById("item") as HTMLInputElement;
    const fileReader = new FileReader()

    fileReader.onload = (e) => {
        const fileContent = e.target?.result as String
        const lines = fileContent.split(/\r?\n/)
        let allNumers: number[] = []

        for (const line of lines) {
            allNumers.push(+line)
        }
        
        const find = toFind.value.length == 0 ? 1 : parseInt(toFind.value)

        const startTime: number = new Date().getTime()
        const index = binarySort(allNumers, find)
        const duration: number = new Date().getTime() - startTime

        alert(`Index: ${index} lapsed: ${duration/1000}`)
    }

    fileInput.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement
        if (target.files) {
            let file: File | undefined
            if (target.files[0])
                file = target.files[0]
            if (file){
                fileReader.readAsText(file)
            }
        }
    })
})