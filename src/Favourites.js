

var values = Object.values({
    "-L3539A9RSB_2KF5uizP": "7de10565-8826-40b8-9da0-adbf044b49af",
    "-L353A6Y87kTF4sGcipb": "7902d15d-689d-490d-8d44-9d9d8fc5df9c",
    "-L353DKtHyBS-LozMabv": "7de10565-8826-40b8-9da0-adbf044b49af",
    "-L353FNdPynsP3MUgTqX": "6546eaf8-a823-4a50-9952-b621015a7719",
    "-L353GX2hj49E73B3TTJ": "b48e1ac3-ba0e-4914-b3de-afe20eff8ac2",
    "-L353Hkq9sjfr4PRPwkV": "6546eaf8-a823-4a50-9952-b621015a7719",
    "-L353IenJOl8om8xM8QB": "b48e1ac3-ba0e-4914-b3de-afe20eff8ac2",
    "-L354CV-NPmVYigbP-CJ": "ba968a21-2a8c-4243-aeec-4d1ef6247a23",
    "-L354EHn3CrRCXAgSHdS": "076de182-aa1d-4bb3-9111-94fcc4c3950a",
    "-L354G10-NjyEBxNW5MX": "076de182-aa1d-4bb3-9111-94fcc4c3950a",
    "-L354HhApGzS4FaBM-R7": "051a4b56-9dc8-463f-ac46-09c5186f18da",
    "-L35FnWvdqwKDNiZyEjc": "b48e1ac3-ba0e-4914-b3de-afe20eff8ac2",
    "-L35FoR-Zf_axqL1BmQj": "6546eaf8-a823-4a50-9952-b621015a7719",
    "-L35FogVpDCtPCmF_VW4": "6546eaf8-a823-4a50-9952-b621015a7719",
    "-L35FoyuN9QyU2npULJT": "6546eaf8-a823-4a50-9952-b621015a7719",
    "-L35FqP8YxfXWpMkQJxQ": "7773cf85-2da6-4e26-b40f-6c784baee1de",
    "-L35FqkB69FI5daBoV2l": "7773cf85-2da6-4e26-b40f-6c784baee1de",
    "-L35Fs8C8YWjn-6J--l1": "076de182-aa1d-4bb3-9111-94fcc4c3950a"
})


console.log(values)
var sample = function(values) {
    var sortedValues = values.filter(function(e, i, a) {
            return a.indexOf(e) === i


        }
    )
    return sortedValues
}
console.log(sample(values))

console.log(sample(values).sort())