# Always prefer setuptools over distutils
from setuptools import setup, find_packages
# To use a consistent encoding
from os import path
import subprocess

here = path.abspath(path.dirname(__file__))

# Try to create an rst long_description from README.md
try:
    args = 'pandoc', '--to', 'rst', 'README.md'
    long_description = subprocess.check_output(args)
    long_description = long_description.decode()
except Exception as error:
    print('README.md conversion to reStructuredText failed. Error:')
    print(error)
    print('Setting long_description to None.')
    long_description = None

setup(
    name='git-pretty',
    version='0.1.2',
    description='An implementation of Justin Hileman\'s chart from "Changing History, or How to Git Pretty"',
    long_description=long_description,
    url='https://github.com/draperunner/git-pretty',
    author='Mats Byrkjeland',
    author_email='matsbyr@gmail.com',
    license='MIT',
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Topic :: Software Development',
        'Topic :: Software Development :: Version Control :: Git',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
    keywords='git',
    packages=find_packages(exclude=['contrib', 'docs', 'tests']),
    install_requires=['future'],
    package_data={},
    entry_points={
        'console_scripts': [
            'git-pretty=git_pretty.git_pretty:console_script_wrapper'
        ],
    },
)
