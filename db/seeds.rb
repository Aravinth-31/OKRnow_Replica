# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
MasterDatum.create(user:'master');
# perms=['RESET']
# for i in perms
#     AllRole.create(section:'Reset Password',permit:i)
# end
# Companyobjective.create([{name:'Obj1',desc:'this is objective 1',quadrant:'Q1'},{name:'Obj2',desc:'this is objective 2',quadrant:'Q1'}])
# Companykeyresult.create([{name:'key1',desc:'this is key result 1',companyobjective_id:9,percent:66},{name:'key2',desc:'this is key result 2',companyobjective_id:9,percent:88}])
Deptobjective.create({name:'Obj1',desc:'This is obj1',companyobjective_id:9})
